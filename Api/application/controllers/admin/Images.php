<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Images extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();

		$this->load->model( 'admin/Product_model' );
	}

	public function upload($id)
	{
		if ( !empty( $_FILES ) )
		{
		    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];		    
			$basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
			mkdir( $basePath , 0700 );
		    $basePath = $basePath . $id . DIRECTORY_SEPARATOR;
		    mkdir( $basePath , 0700 );

		    $uploadPath = $basePath . $_FILES[ 'file' ][ 'name' ];
		    
		    move_uploaded_file( $tempPath, $uploadPath );
		    $answer = array( 'answer' => 'File transfer completed' );
		    $json = json_encode( $answer );
		    echo $json;
		} 
		else 
		{
		    echo 'No files';
		}
	}

	public function get ($id)
	{
		$basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
		$basePath = $basePath . $id . DIRECTORY_SEPARATOR;

		if(!is_dir($basePath))
			return;

		$tempFiles = scandir ($basePath);
		$tempFiles = array_diff( $tempFiles, array('.', '..'));

		$files = array();
		foreach ($tempFiles as $file)
		{
			$files[].=$file;
		}
	    $newFiles = array();
	    foreach ( $files as $file )
	    {
	    	$newFiles[] .= $file;
	    }

	    echo json_encode( $newFiles );

	}

	public function delete ()
	{
		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );

		$token = $this->input->post( 'token' );
		$token = $this->jwt->decode( $token , config_item( 'encryption_key' ) );	

		if ( $token->role != 'admin' )
			exit( 'Nie jesteś adminem' );

		if($token->expireTime < time())
        {
            $errors = true;
            echo json_encode( $errors );
            exit( 'Sesja wygasła. Proszę zalogować się ponownie' );
        }

		
		
		$id = $this->input->post( 'id' );
		$image = $this->input->post( 'image' );

	    $imagePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
	    $imagePath = $imagePath . $id . DIRECTORY_SEPARATOR;
	    $imagePath = $imagePath . $image;

	    unlink( $imagePath );
	}

	public function setThumb()
	{

		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );

		$token = $this->input->post( 'token' );
		$token = $this->jwt->decode( $token , config_item( 'encryption_key' ) );	

		if ( $token->role != 'admin' )
			exit( 'Nie jesteś adminem' );

		if($token->expireTime < time())
        {
            $errors = true;
            echo json_encode( $errors );
            exit( 'Sesja wygasła. Proszę zalogować się ponownie' );
        }


		$input = $this->input->post( 'product' );
		$productId = $input['id'];

		$imageName = $this->input->post( 'image' );
		$product['thumb'] = $imageName;

		$this->Product_model->setThumb( $productId , $product );
	}


}

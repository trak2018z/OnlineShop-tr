<?php
class Products extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input');
		$_POST = json_decode( $post, true);

		$this->load->model('Site/Product_model');
	}

	public function get ( $id = false)
	{
		$output = $this->Product_model->get($id);

		echo json_encode($output);
	}

	public function getImages ($id)
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

		echo json_encode($files);
	}
}

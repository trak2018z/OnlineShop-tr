<?php
class Products extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input');
		$_POST = json_decode( $post, true);

		$this->load->model('Admin/Product_model');
	}

	public function get ( $id = false)
	{
		$output = $this->Product_model->get($id);

		echo json_encode($output);
	}

	public function update()
	{
		$product = $this->input->post( 'product' );
		$this->Product_model->update( $product );
	}

	public function create()
	{
		$product = $this->input->post( 'product' );
		$this->Product_model->create( $product );
	}

	public function delete ()
	{
		$product = $this->input->post( 'product' );
		$this->Product_model->delete( $product );
	}
}

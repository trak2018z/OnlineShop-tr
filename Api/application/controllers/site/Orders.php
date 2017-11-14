<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Orders extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );

		$this->load->model( 'site/Orders_model' );

		$token = $this->input->post( 'token' );
		$token = $this->jwt->decode( $token , config_item( 'encryption_key' ));

		if($token->expireTime < time())
		{
			$errors = true;
			echo json_encode( $errors );
			return false;
		}
	}

	public function create()
	{
		$payload = $this->input->post( 'payload' );
		unset( $payload['role'] );
		unset( $payload['expireTime'] );

		$data = $payload;

		$items = $this->input->post( 'items' );
		$items = json_encode( $items , JSON_FORCE_OBJECT );

		$data['items'] = $items;
		$data['total'] = $this->input->post( 'total' );

		$this->Orders_model->create( $data );
	}

	public function get()
	{
		$payload = $this->input->post( 'payload' );
		$userId = $payload['userId'];

		$output = $this->Orders_model->get($userId);

		echo json_encode( $output );
	}

}
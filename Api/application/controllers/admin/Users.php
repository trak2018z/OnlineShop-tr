<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );

		$this->load->model( 'Admin/User_model' );	
	}

	public function get( $id = false )
	{
		$output = $this->User_model->get( $id );
		echo json_encode( $output );
	}

	public function update()
	{

		$this->form_validation->set_error_delimiters( '' , '' );
		$this->form_validation->set_rules( 'name' , 'Imię' , 'required|min_length[3]' );
		$this->form_validation->set_rules( 'email' , 'Email' , 'required|valid_email|callback_unique_email' );
		$this->form_validation->set_rules( 'password' , 'Nowe hasło' , 'min_length[6]|matches[passconf]' );
		$this->form_validation->set_rules( 'passconf' , 'Powtórz nowe hasło' , 'matches[password]' );

		if ( $this->form_validation->run() )
		{
			$user = $this->input->post( 'user' );
			unset ($user['passconf']);

			$user['password'] = password_hash( $user['password'], PASSWORD_DEFAULT);

			$this->User_model->update( $user );
		}
		else
		{
			$errors['name'] = form_error( 'name' );
			$errors['email'] = form_error( 'email' );
			$errors['password'] = form_error( 'password' );
			$errors['passconf'] = form_error( 'passconf' );
			echo json_encode( $errors );
		}

	}

	public function create()
	{
		$this->form_validation->set_error_delimiters( '' , '' );
		$this->form_validation->set_rules( 'name' , 'Imię' , 'required|min_length[3]' );
		$this->form_validation->set_rules( 'email' , 'Email' , 'required|valid_email|is_unique[users.email]' );
		$this->form_validation->set_rules( 'password' , 'Hasło' , 'required|min_length[6]|matches[passconf]' );
		$this->form_validation->set_rules( 'passconf' , 'Powtórz hasło' , 'required|matches[password]' );

		if ( $this->form_validation->run() )
		{
			$user = $this->input->post( 'user' );
			unset ($user['passconf']);

			$user['password'] = password_hash( $user['password'], PASSWORD_DEFAULT);

			$this->User_model->create( $user );
		}
		else
		{
			$errors['name'] = form_error( 'name' );
			$errors['email'] = form_error( 'email' );
			$errors['password'] = form_error( 'password' );
			$errors['passconf'] = form_error( 'passconf' );
			echo json_encode( $errors );
		}

	}

	public function delete()
	{
		$user = $this->input->post( 'user' );
		$this->User_model->delete( $user );
	}

	function unique_email()
	{
		$id = $this->input->post( 'id' );
		$email = $this->input->post( 'email' );

		if ( $this->User_model->get_unique( $id , $email ) )
		{
			$this->form_validation->set_message( 'unique_email' , 'Inny użytkownik ma taki adres e-mail' );
			return false;
		}

		return true;
	}

}
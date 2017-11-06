<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model {

	public function get( $id  )
	{
		$this->db->where( 'id' , $id );
		$q = $this->db->get( 'users' );
		$q = $q->row();

		return $q;

	}

	public function create( $user )
	{
		$this->db->insert( 'users' , $user );
	}

	public function get_unique( $id , $email )
	{
		$this->db->where( 'email' , $email );
		!$id || $this->db->where( 'id !=' , $id );
		$q = $this->db->get( 'users' );

		return $q->row();
	}

	public function login($email, $password)
	{
		$this->db->where( 'email', $email);
		$q = $this->db->get( ' users' );
		$result = $q->row();

		if(empty($result) || !password_verify( $password , $result->password ))
		{
			$output = false;
		}
		else
		{
			$output = $result;
		}

		return $output;
	}

}
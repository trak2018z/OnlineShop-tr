<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Orders_model extends CI_Model {

	// public function get( $id )
	// {

	// 	$this->db->where( 'id' , $id );
	// 	$q = $this->db->get( 'users' );
	// 	$q = $q->row();

	// 	return $q;

	// }

	public function create( $data )
	{
		$this->db->insert( 'orders' , $data );
	}

}

/* End of file  */
/* Location: ./application/models/ */
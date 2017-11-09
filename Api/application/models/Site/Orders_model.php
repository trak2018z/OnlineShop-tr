<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Orders_model extends CI_Model {

	public function get( $id )
	{
		$this->db->where( 'userId' , $id );
		$q = $this->db->get( 'orders' );
		$q = $q->result();

		return $q;
	 }

	public function create( $data )
	{
		$this->db->insert( 'orders' , $data );
	}

}
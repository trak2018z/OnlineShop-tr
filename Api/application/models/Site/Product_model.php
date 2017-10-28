<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Product_model extends CI_Model
{
	public function get($id = false)
	{
		if($id == false)
		{
			$q = $this->db->get( 'products');
			$result = $q->result();
		}
		else
		{
			$q = $this->db->where( 'id', $id);
			$q = $this->db->get( 'products');
			$result = $q->row();
		}		
		
		return $result;
	}
}
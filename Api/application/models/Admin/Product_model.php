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

	public function update( $product )
	{
		$this->db->where( 'id' , $product['id'] );
		$this->db->update( 'products' , $product );
	}

	public function create( $product )
	{
		$this->db->insert( 'products' , $product );
	}

	public function delete( $product )
	{
		$this->db->where( 'id' , $product['id'] );
		$this->db->delete( 'products' );
	}

	public function setThumb( $productId , $product )
	{
		$this->db->where( 'id' , $productId );
		$this->db->update( 'products' , $product );
	}

}
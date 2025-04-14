<?php
// This file is generated. Do not modify it manually.
return array(
	'latest-posts' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/latest-posts',
		'version' => '0.1.0',
		'title' => 'Latest Posts',
		'category' => 'text',
		'icon' => 'admin-post',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'latest-posts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'numberOfPosts' => array(
				'type' => 'number',
				'default' => 6
			),
			'displayImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date'
			),
			'categories' => array(
				'type' => 'array',
				'items' => array(
					'type' => 'object'
				)
			)
		)
	)
);

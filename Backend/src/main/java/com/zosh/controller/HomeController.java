package com.zosh.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController 
{
	@GetMapping //To retrieve data
	public String homeControllerHandler() 
	{
		return "This is home controller";
	}

	@GetMapping("/home")
	public String homeControllerHandler2()
	{
		return "This is home controller 2";
	}
	
	@GetMapping("/codewithzosh")
	public String homeControllerHandler3()
	{
		return "hello code with zosh";
	}
}

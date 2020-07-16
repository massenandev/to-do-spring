package br.com.massenan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MenuController {

	@GetMapping("/")
	public String login() {
		return "login";
	}

	@GetMapping("/dashboard")
	public String dashboard() {
		return "dashboard";
	}
	
	@GetMapping("/task")
	public String task() {
		return "/task/task";
	}
}

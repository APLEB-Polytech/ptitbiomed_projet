package fr.apleb.ptitbiomedapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BaseController {
	@GetMapping(value = "/error")
	public String error() {
		return "forward:/index.html";
	}
}

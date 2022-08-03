package fr.apleb.ptitbiomedapi.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BaseController implements ErrorController {
	@GetMapping(value = "/error")
	public String error() {
		return "forward:/index.html";
	}
}

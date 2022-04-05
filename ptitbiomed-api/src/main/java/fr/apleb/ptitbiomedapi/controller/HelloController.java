package fr.apleb.ptitbiomedapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {
    private final Logger logger = LoggerFactory.getLogger(HelloController.class);
    private final ObjectMapper objectMapper;

    public HelloController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() throws JsonProcessingException {
        logger.info("REST GET : Hello");
        return ResponseEntity.ok(this.objectMapper.writeValueAsString("Hello World"));
    }
}

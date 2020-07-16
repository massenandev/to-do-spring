package br.com.massenan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.massenan.dto.TaskDto;
import br.com.massenan.service.TaskService;

@Controller
@RequestMapping("/tasks")
public class TaskController {
	
	@Autowired
	private TaskService service;
	
	@GetMapping("/all")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok().body(TaskDto.parse(service.findAll()));
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<?> loadById(@PathVariable Long id) {
		return ResponseEntity.ok().body(TaskDto.parse(service.findById(id).get()));
	}

	@PostMapping(value = "/new", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody TaskDto taskDto) {

		try {
			service.create(TaskDto.parse(taskDto));
			return new ResponseEntity<>(TaskDto.parse(service.findAll()), HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> update(TaskDto taskDto) {

		try {
			service.update(TaskDto.parse(taskDto));
			return ResponseEntity.ok("Task updated successfully!");
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping(value = "/status/{status}/id/{id}")
	public ResponseEntity<?> setStatus(@PathVariable boolean status, @PathVariable Long id){
		
		try {
			service.updateStatus(id, status);
			return ResponseEntity.ok().body(TaskDto.parse(service.findAll()));
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
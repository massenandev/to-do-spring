package br.com.massenan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.massenan.domain.Task;
import br.com.massenan.repository.TaskRepository;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository repository;
	
	public List<Task> findAll(){
		return repository.findAll();
	}

	public void create(Task task) {
		repository.save(task);
	}
	
	public Task findById(Long id, boolean active) {
		return repository.findById(id, active);
	}

	public Optional<Task> findById(Long id) {
		return repository.findById(id);
	}
	
	public void deleteById(Long id) {
		repository.deleteById(id);
	}
	
	public void update(Task task) {
		repository.saveAndFlush(task);
	}

}

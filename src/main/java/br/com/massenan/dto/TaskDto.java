package br.com.massenan.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import br.com.massenan.domain.Task;

public class TaskDto {

	private Long id;
	private String name;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	private boolean active;

	public static List<TaskDto> parse(List<Task> tasks) {
		List<TaskDto> dto = new ArrayList<TaskDto>();
		tasks.forEach(t -> dto.add(parse(t)));
		return dto;
	}
	
	public static Task parse(TaskDto dto) {
		Task task = new Task();
		task.setId(dto.getId());
		task.setName(dto.getName());
		task.setCreateDate(dto.getCreateDate());
		task.setUpdateDate(dto.getUpdateDate());
		task.setActive(dto.isActive());
		return task;
	}
	
	public static TaskDto parse(Task task) {
		TaskDto dto = new TaskDto();
		dto.setId(task.getId());
		dto.setName(task.getName());
		dto.setCreateDate(task.getCreateDate());
		dto.setUpdateDate(task.getUpdateDate());
		task.setActive(task.isActive());
		return dto;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public LocalDateTime getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(LocalDateTime updateDate) {
		this.updateDate = updateDate;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}

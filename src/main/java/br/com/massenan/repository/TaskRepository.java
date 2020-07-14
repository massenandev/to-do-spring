package br.com.massenan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.massenan.domain.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

	@Query("SELECT t FROM Task t WHERE t.id = ?1 AND t.active = ?2")
	Task findById(Long id, boolean active);
}

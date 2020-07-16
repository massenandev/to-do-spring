package br.com.massenan.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.massenan.domain.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

	@Query("SELECT t FROM Task t WHERE t.id = ?1 AND t.active = ?2")
	Task findById(Long id, boolean active);
	
	@Transactional
	@Modifying
	@Query("UPDATE Task t SET t.active = ?1 WHERE t.id = ?2")
	public void updateStatus(boolean active, Long id);
}

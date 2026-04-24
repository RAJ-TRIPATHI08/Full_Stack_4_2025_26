package com.votingApp.votingApp.Repository;
import com.votingApp.votingApp.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface pollRepository extends JpaRepository<Poll,Long> {


}

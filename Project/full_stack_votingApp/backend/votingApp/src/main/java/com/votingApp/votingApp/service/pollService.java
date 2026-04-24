package com.votingApp.votingApp.service;

import com.votingApp.votingApp.Repository.pollRepository;
import com.votingApp.votingApp.entity.OptionVote;
import com.votingApp.votingApp.entity.Poll;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class pollService {


    //dependency Injection
    private final pollRepository pollRepository;
    public pollService(pollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPollById(Long id){
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionIndex) {
        //get the poll object from database
        //get all options
        //if index invalid throw error
        //get selected option (through map) and increment vote of that option
        //save the incremented options
        Poll poll = pollRepository.findById(pollId).orElseThrow(()-> new RuntimeException("Poll not found"));
        List<OptionVote> options = poll.getOptions();
        if(optionIndex<0 || optionIndex>=options.size()){
            throw  new IllegalArgumentException("Invalid option index");
        }
        //get selected option
        OptionVote selectedOption = options.get(optionIndex);

        //increment
        selectedOption.setVoteCount(selectedOption.getVoteCount()+1);

        //save changes
        pollRepository.save(poll);
    }
}

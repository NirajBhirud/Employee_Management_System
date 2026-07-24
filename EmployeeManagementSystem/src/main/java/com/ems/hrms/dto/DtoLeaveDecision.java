package com.ems.hrms.dto;

public class DtoLeaveDecision {

    private Boolean paid; // used on approve only; ignored on reject
    private String comment;

    public DtoLeaveDecision() {
    }

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
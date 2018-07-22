package com.sszkoluda.shopproductslist.exception;


public class FamilyUserException extends Exception {
    private static final long serialVersionUID = 1L;
    private String errorMessage;

    public String getErrorMessage() {
        return errorMessage;
    }
    public FamilyUserException(String errorMessage) {
        super(errorMessage);
        this.errorMessage = errorMessage;
    }
    public FamilyUserException() {
        super();
    }
}
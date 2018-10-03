package com.sszkoluda.shopproductslist.exception;

public class FamilyException extends Exception {
    private static final long serialVersionUID = 1L;
    private String errorMessage;

    public String getErrorMessage() {
        return errorMessage;
    }

    public FamilyException(String errorMessage) {
        super(errorMessage);
        this.errorMessage = errorMessage;
    }

    public FamilyException() {
        super();
    }
}

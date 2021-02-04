//package com.spring.rest.request;
//
//import java.util.Set;
//
//import javax.validation.constraints.Email;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.NotEmpty;
//import javax.validation.constraints.NotNull;
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//import com.spring.rest.validation_annotation.PasswordValueMatch;
//import com.spring.rest.validation_annotation.ValidPassword;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.NonNull;
//
//@PasswordValueMatch.List({
//    @PasswordValueMatch(
//            field = "password",
//            fieldMatch = "confirmPassword",
//            message = "Passwords do not match!"
//    )
//})
//@NoArgsConstructor
//@AllArgsConstructor
//public @Data class SignupRequest {
//    @NonNull
//    @NotBlank(message = "username is mandatory")
//    private String username;
// 
//    @NotNull
//    @NotEmpty
//    @Email
//    private String email;
//    
//    
//    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
//    private Set<String> role;
//    
//    @ValidPassword
//    @NonNull
//    @NotBlank(message = "New password is mandatory")
//    private String password;
//  
//
//    @ValidPassword
//    @NonNull
//    @NotBlank(message = "Confirm Password is mandatory")
//    private String confirmPassword;
//}

package com.spring.rest.request;

import java.util.Set;

import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;


public @Data class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private Set<String> role;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
  
}

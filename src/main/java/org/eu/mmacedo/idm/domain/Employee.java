package org.eu.mmacedo.idm.domain;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Employee {
	@Id private String id;
	
	private String firstName;
	private String lastName;
	private String userName;
	private String title;
	private String phone;
	private String department;
	private String manager;
	private Date birth;
	private BigDecimal salary;
	
}

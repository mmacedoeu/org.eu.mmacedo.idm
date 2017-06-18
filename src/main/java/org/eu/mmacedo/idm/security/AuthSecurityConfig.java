package org.eu.mmacedo.idm.security;

import org.eu.mmacedo.idm.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;

@Configuration
public class AuthSecurityConfig extends GlobalAuthenticationConfigurerAdapter {

	@Autowired
	private PersistedUserDetailsService userDetailsService;
	
	@Override
	public void init(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN");		
		auth.userDetailsService(userDetailsService)
		.passwordEncoder(User.PASSWORD_ENCODER);
	}	
}

package org.eu.mmacedo.idm.security;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//basic auth
//		http.authorizeRequests().anyRequest().fullyAuthenticated().and().sessionManagement()
//				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().httpBasic().realmName("idm").and().csrf()
//				.disable();
		
        // @formatter:off
		http.authorizeRequests().antMatchers("/login").permitAll()
			.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()		
			.antMatchers("/tokens/**").permitAll()
			.anyRequest().authenticated()
			.and().formLogin().permitAll()
			.and().csrf().disable();
		// @formatter:on		
	}
}

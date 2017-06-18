package org.eu.mmacedo.idm.security;

import org.eu.mmacedo.idm.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class PersistedUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Autowired
	public PersistedUserDetailsService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		org.eu.mmacedo.idm.domain.User user = this.userRepository.findByName(name);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("%s not found.", name));
		}
		return new User(user.getName(), user.getPassword(),
				AuthorityUtils.createAuthorityList(user.getRoles()));
	}

}

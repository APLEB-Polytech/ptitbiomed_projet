package fr.apleb.ptitbiomedapi.config;


import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class FilterNotFound extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		if (!isApiPath(request)) {
			response.sendRedirect("forward:/index.html");
		}
		filterChain.doFilter(request, response);
	}

	private boolean isApiPath(HttpServletRequest request) {
		String path = request.getServletPath();
		return !path.startsWith("/api");
	}

}

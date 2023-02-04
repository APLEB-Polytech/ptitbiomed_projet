package fr.apleb.ptitbiomedapi.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class AngularFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String requestURI = request.getRequestURI();
		String contextPath = request.getContextPath();
		if (!isApiRequest(requestURI, contextPath) && !isFileRequest(requestURI, contextPath)) {
			request.getRequestDispatcher("/").forward(request, response);
			return;
		}
		filterChain.doFilter(request, response);
	}

	private boolean isFileRequest(String requestURI, String contextPath) {
		return requestURI.startsWith(contextPath + "/assets")
				|| requestURI.startsWith(contextPath + "/favicon.ico")
				|| requestURI.endsWith(contextPath + ".js")
				|| requestURI.endsWith(contextPath + ".css")
				|| requestURI.startsWith(contextPath + "/error")
				;
	}

	private boolean isApiRequest(String requestURI, String contextPath) {
		return requestURI.startsWith(contextPath + "/api");
	}
}

package il.co.boj.ldp.ui.security.config;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Cache-Control, X-Authorization, Content-Type, Accept, X-Requested-With,x-requested-with, remember-me, Content-Disposition, x-suggested-filename");
        response.setHeader("Access-Control-Request-Headers", "Content-Type, X-Requested-With");
        response.setHeader("Access-Control-Expose-Headers", "Content-Disposition, x-suggested-filename");




        if (notPreflight(request)) {
            chain.doFilter(req, res);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }

    private boolean notPreflight(HttpServletRequest request) {
        return !HttpMethod.OPTIONS.toString().equalsIgnoreCase(request.getMethod());
    }
}
package il.co.boj.ldp.ui.security.auth.jwt.extractor;


public interface TokenExtractor {
    String extract(String payload);
}

package il.co.boj.ldp.ui.security.model;


public enum Scopes {
    REFRESH_TOKEN;

    public String authority() {
        return this.name();
    }
}

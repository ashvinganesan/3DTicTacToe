public enum Player {

    X,
    O;

    public Player other() {
        switch (this) {
            case X: return O;
            case O: return X;
            default: return null;
        }
    }

    public static Player valueOf(char c) {
        switch(c) {
            case 'x':
            case 'X':
                return X;

            case 'o':
            case 'O':
                return O;

            default:
                return null;
        }
    }
            

    @Override
    public String toString() {
        switch (this) {
            case X: return "X";
            case O: return "O";
            default: return ".";
        }
    }
}

package tttweb;

import org.teavm.jso.JSExport;
public class WebEntry {

    @JSExport
    public static int[] ttt_bestMove(String boardString, char player) {
        return TTTEngine.bestMove(boardString, player);
    }

    @JSExport
    public static String ttt_apply(String boardString, int x, int y, int z, char player) {
        return TTTEngine.applyMove(boardString, x, y, z, player);
    }
}



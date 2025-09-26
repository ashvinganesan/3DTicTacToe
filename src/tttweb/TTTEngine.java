package tttweb;

import ttt.AlphaBeta;
import ttt.Board;
import ttt.Coordinate;
import ttt.Player;

public class TTTEngine {

    public static int[] bestMove(String boardString, char playerChar) {
        Board board = new Board(boardString);
        Player player = Player.valueOf(playerChar);
        if (player == null) {
            throw new IllegalArgumentException("Invalid player: " + playerChar);
        }
        AlphaBeta search = new AlphaBeta();
        // Time-budget: 500ms per AI move in browser
        search.setTimeBudgetMs(500);
        Coordinate move = search.bestMove(board, player);
        if (move == null) {
            return null;
        }
        return new int[] { move.getX(), move.getY(), move.getZ() };
    }

    public static String applyMove(String boardString, int x, int y, int z, char playerChar) {
        Board board = new Board(boardString);
        Player player = Player.valueOf(playerChar);
        if (player == null) {
            throw new IllegalArgumentException("Invalid player: " + playerChar);
        }
        if (!board.isEmpty(x, y, z)) {
            throw new IllegalArgumentException("Cell is not empty at (" + x + "," + y + "," + z + ")");
        }
        board.set(x, y, z, player);
        return toBoardString(board);
    }

    private static String toBoardString(Board board) {
        StringBuilder sb = new StringBuilder(64);
        for (int pos = 0; pos < 64; pos++) {
            Player p = board.get(pos);
            if (p == null) {
                sb.append('.');
            } else {
                sb.append(p.toString());
            }
        }
        return sb.toString();
    }
}



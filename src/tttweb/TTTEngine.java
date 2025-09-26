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
        // Opening/game-early fallback to avoid long compute on 4x4x4 empty boards
        int empties = board.numberEmptySquares();
        if (empties > 56) { // first 8 plies; prefer center-ish squares
            int[][] preferred = new int[][] {
                {1,1,1}, {2,2,2}, {1,1,2}, {1,2,1}, {2,1,1}, {2,2,1}, {2,1,2}, {1,2,2}
            };
            for (int[] p : preferred) {
                if (board.isEmpty(p[0], p[1], p[2])) {
                    return new int[] { p[0], p[1], p[2] };
                }
            }
            // fallback to first empty
            for (Coordinate c : board.emptySquares()) {
                return new int[] { c.getX(), c.getY(), c.getZ() };
            }
        }
        AlphaBeta search = new AlphaBeta();
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



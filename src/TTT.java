
import java.io.Console;
import static java.lang.System.console;
import java.util.Iterator;

/*
Ashvin Ganesan
Artificial Intelligence
Monday December 13th 2021
TicTacToe Project Final Checkpoint
 */
public class TTT {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int ply = 3;
        String startingPos = "";
        Player me = Player.X;//refers to computer as me
        boolean compfirst = true;
        for (int i = 0; i < args.length; i++) {
            String arg = args[i].toUpperCase();
            switch (arg) {
                case "-X":
                    break;
                case "-O":
                    me = Player.O;
                    break;
                case "-FIRST":
                    break;
                case "-SECOND":
                    compfirst = false;
                    break;
                case "-PLIES":
                    i++;
                    ply = Integer.parseInt(args[i]);
                    break;
                default:
                    startingPos = arg;
                    break;

            }
        }
        System.out.println("____________________________");
        Board b = new Board(startingPos);
        b.print();
        System.out.println("____________________________\n");

        while (!b.isTerminal()) {
            if (compfirst) {
                Coordinate a = getMove(b, me);
                if(!b.isEmpty(a)) {
                    System.out.println("Computer is suggesting an illegal move");
                }
                b.set(a, me);
            } else {
                Coordinate a = getPlayerMove();
                if(!b.isEmpty(a)) {
                    System.out.println("YOU ARE suggesting an illegal move");
                    System.out.println("Try again (_-_)");
                    a = getPlayerMove(); 
                }
                b.set(a, me.other());
            }
            compfirst = !compfirst;
            System.out.println("____________________________");
            b.print();
            System.out.println("____________________________\n");
        }

        if (b.playerWon(me)) {
            System.out.println("WIN");
        } else if (b.playerWon(me.other())) {
            System.out.println("Lost");
        } else {
            System.out.println("TIE");
        }

//        System.out.println("Ply: " + ply);
//        System.out.println("Comp Mark: " + me);
//        if(compfirst) {
//            System.out.println("Computer is going First");
//        } else {
//            System.out.println("Computer is going Second");
//        }
//        System.out.println("starting order");
//        System.out.println(startingPos);
    }

    public static Coordinate getMove(Board b, Player me) {      
        AlphaBeta a = new AlphaBeta();
        return a.bestMove(b, me);
    }

    public static Coordinate getPlayerMove() {
        Console console = System.console();
        String line = "";
        int row = 0;
        int col = 0;
        int board = 0;
        do {
            line = console.readLine("Board: ");
            try {
                board = Integer.parseInt(line) - 1;
            } catch (NumberFormatException e) {
                System.out.println("Invalid board: " + line);
                return getPlayerMove();
            }
            if (board >= 0 && board < 4) {
                break;
            }
            System.out.println("Invalid board: " + line);
        } while (true);
        
        do {
            line = console.readLine("Row: ");
            try {
                row = Integer.parseInt(line) - 1;
            } catch (NumberFormatException e) {
                System.out.println("Invalid row: " + line);
                return getPlayerMove();

            }
            if (row >= 0 && row < 4) {
                break;
            }
            System.out.println("Invalid row: " + line);
        } while (true);
        do {
            line = console.readLine("Column: ");
            try {
                col = Integer.parseInt(line) - 1;
            } catch (NumberFormatException e) {
                System.out.println("Invalid column: " + line);
                return getPlayerMove();
            }
            if (col >= 0 && col < 4) {
                break;
            }
            System.out.println("Invalid column: " + line);
        } while (true);
        

        return Coordinate.valueOf(row, col, board);
    }
}

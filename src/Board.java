/*
Ashvin Ganesan
Artificial Intelligence
Monday December 13th 2021
TicTacToe Project Final Checkpoint
 */
import java.util.ArrayList;
import java.util.Iterator;

public class Board {

    public static final int N = 4;

    private long x; // Boolean vector of positions containing X's
    private long o; // Boolean vector of positions containing O's

    // Constructors.
    public Board() {
        this.x = 0;
        this.o = 0;
    }

    public Board(Board board) {
        this.x = board.x;
        this.o = board.o;
    }

    public Board(String s) {
        int position = 0;
        this.x = 0;
        this.o = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case 'x':
                case 'X':
                    this.set(position++, Player.X);
                    break;

                case 'o':
                case 'O':
                    this.set(position++, Player.O);
                    break;

                case '.':
                    position++;
                    break;

                case ' ':
                case '|':
                    break;

                default:
                    throw new IllegalArgumentException("Invalid player: " + c);
            }
        }
    }

    public boolean isTerminal() {
        return (playerWon(Player.O) || playerWon(Player.X) || numberEmptySquares() == 0);
    }

    public boolean playerWon(Player p) {
        long pPos = get(p);
        boolean won = false;
        for (Line l : Line.lines) {
            if ((l.positions() & pPos) == l.positions()) {
                won = true;
            }
        }
        return won;
    }

    public static int numOfOnesInLong(long num) {
        int count = 0;
        while (num != 0) {
            num = num & (num - 1);
            count++;
        }
        return count;
    }

    public int evaluate(Player p) {
        long pPos = get(p);
        long oPos = get(p.other());
        long lPos;
        int fours = 0;
        int threes = 0;
        int twos = 0;
        int ones = 0;
        int oFours = 0;
        int oThrees = 0;
        int oTwos = 0;
        int oOnes = 0;
        for (Line l : Line.lines) {
            lPos = (l.positions());
            long tempPPos = (lPos & pPos);
            long tempOPos = (lPos & oPos);
            int j = numOfOnesInLong(tempOPos);
            int k = numOfOnesInLong(tempPPos);
            if (j == 0) {
                int i = numOfOnesInLong(tempPPos);
                if (i == 1) {
                    ones++;
                } else if (i == 2) {
                    twos++;
                } else if (i == 3) {
                    threes++;
                } else if (i == 4) {
                    fours++;
                }
            }
            if(k == 0) {
                int i = numOfOnesInLong(tempOPos);
                if (i == 1) {
                    oOnes++;
                } else if (i == 2) {
                    oTwos++;
                } else if (i == 3) {
                    oThrees++;
                } else if (i == 4) {
                    oFours++;
                }
            }
            
        }
        if(threes >0 | fours >0) {
            return fours *1000000000 + threes+10000000 + twos*10000+ ones*10;//original function
        }
//        return fours *1000000000 + threes+10000000 + twos*10000+ ones*10;
        return fours *100000000 + threes+40000 + twos*10000+ ones*10 - oFours *100000000 + oThrees+40000 +oTwos*10000+ oOnes*10; //I'll change this later
    }
    // Empty squares.

    public boolean isEmpty(int position) {
        assert Coordinate.isValid(position);
        return !Bit.isSet(this.x | this.o, position);
    }

    public boolean isEmpty(Coordinate coordinate) {
        return this.isEmpty(coordinate.position());
    }

    public boolean isEmpty(int x, int y, int z) {
        return this.isEmpty(Coordinate.position(x, y, z));
    }

    public int numberEmptySquares() {
        return Bit.countOnes(~(this.x | this.o));
    }

    // Get value of a square on the board.
    public long get(Player player) {
        switch (player) {
            case X:
                return this.x;
            case O:
                return this.o;
            default:
                return 0;
        }
    }

    public Player get(int position) {
        assert Coordinate.isValid(position);
        if (Bit.isSet(this.x, position)) {
            return Player.X;
        }
        if (Bit.isSet(this.o, position)) {
            return Player.O;
        }
        return null;
    }

    public Player get(Coordinate coordinate) {
        return this.get(coordinate.position());
    }

    public Player get(int x, int y, int z) {
        return this.get(Coordinate.position(x, y, z));
    }

    // Set value of a square on the board.
    public void set(int position, Player player) {
        assert (isEmpty(position));
        switch (player) {
            case X:
                this.x = Bit.set(this.x, position);
                break;

            case O:
                this.o = Bit.set(this.o, position);
                break;

            default:
                break;
        }
    }

    public void set(Coordinate coordinate, Player player) {
        set(coordinate.position(), player);
    }

    public void set(int x, int y, int z, Player player) {
        set(Coordinate.position(x, y, z), player);
    }

    public void clear(int position) {
        this.x = Bit.clear(this.x, position);
        this.o = Bit.clear(this.o, position);
    }

    public void clear(Coordinate coordinate) {
        clear(coordinate.position());
    }

    public void clear(int x, int y, int z) {
        clear(Coordinate.valueOf(x, y, z));
    }

    // Equality.
    public boolean equals(Board other) {
        return this.o == other.o && this.x == other.x;
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof Board && this.equals((Board) other);
    }

    @Override
    public int hashCode() {
        return Long.hashCode(this.x) * Long.hashCode(this.o);
    }

    // Image & printing functions.
    @Override
    public String toString() {
        String result = "";
        String separator = "";

        for (int position = 0; position < 64; position++) {
            result += separator;
            Player player = this.get(position);
            result += (player != null) ? player : ".";
            if (position % 16 == 0) {
                separator = " | ";
            } else if (position % 4 == 0) {
                separator = " ";
            } else {
                separator = "";
            }
        }
        return result;
    }

    public static Board valueOf(String s) {
        return new Board(s);
    }

    public void print() {
        for (int y = N - 1; y >= 0; y--) {
            for (int z = 0; z < N; z++) {
                for (int x = 0; x < N; x++) {
                    Player player = this.get(x, y, z);
                    if (player != null) {
                        System.out.print(player);
                    } else {
                        System.out.print(".");
                    }
                }
                System.out.print("    ");
            }
            System.out.println();
        }
    }

    // Generate new board for a given move.
    public Board next(Coordinate move, Player player) {
        assert this.isEmpty(move);
        Board result = new Board(this);
        result.set(move, player);
        return result;
    }

    public Board next(int position, Player player) {
        return next(Coordinate.valueOf(position), player);
        // return next(new Coordinate(position), player);
    }

    public Board next(int x, int y, int z, Player player) {
        return next(Coordinate.valueOf(x, y, z), player);
        // return next (new Coordinate(x, y, z), player);
    }

    // Iterators.
    private class EmptySquareIterator implements Iterator<Coordinate> {

        private Iterator<Integer> iterator;

        public EmptySquareIterator() {
            this.iterator = Bit.iterator(~(Board.this.x | Board.this.o));
        }

        public boolean hasNext() {
            return this.iterator.hasNext();
        }

        public Coordinate next() {
            return Coordinate.valueOf(this.iterator.next());
            // return new Coordinate(this.iterator.next());
        }
    }

    public Iterator<Coordinate> emptySquareIterator() {
        return new EmptySquareIterator();
    }

    public Iterable<Coordinate> emptySquares() {
        return new Iterable<Coordinate>() {
            @Override
            public Iterator<Coordinate> iterator() {
                return new EmptySquareIterator();
            }
        };
    }
    
//    public Iterator<Coordinate> sortedEmptySquareIterator() {
//        ArrayList<Coordinate> a = new ArrayList<>();
//        Iterator<Coordinate> iter = emptyStateIterator();
//        EmptySquareIterator t = new emptySquareIterator() {
//            while(t.hasNext()) {
//            a.add(next());
//            }
//        } 
//    }

    public static void main(String[] args) {
        for (String arg : args) {
            Board board = new Board(arg);
            board.print();
            for (Coordinate coord : board.emptySquares()) {
                System.out.print(coord.position() + " ");
            }
            System.out.println();
        }
    }
}

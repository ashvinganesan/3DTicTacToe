/*
Ashvin Ganesan
Artificial Intelligence
Monday December 13th 2021
TicTacToe Project Final Checkpoint
 */

import java.util.ArrayList;
import java.util.Iterator;




public class AlphaBeta {
    private Player computer;
    public Coordinate bestMove(Board state, Player comp) {
        int ply = 5;
        computer = comp;
        Board tstate =  new Board(state);
        
        Iterator<Coordinate> iter = state.emptySquareIterator();
        Coordinate action = null;
//        Action best = (Action)action;
        int val = Integer.MIN_VALUE; 
        ArrayList<Coordinate> actions = new ArrayList<>();
        int count = tstate.numberEmptySquares();
        if(count < 45) {
            ply++;
        }
        if(count < 35) {
            ply++;
        }
        if(count < 20) {
            ply++;
        }
        
        while(iter.hasNext()) {
            Coordinate a = iter.next();
            tstate.set(a, comp);
            int v = minValue(tstate, ply-1, Integer.MIN_VALUE, Integer.MAX_VALUE); 
            //uses ply -1 because this checks 1 level down(so it still checks ply plies)
            //Also this was done the game plays differently randomly.
            tstate =  new Board(state);
            if(v > val) {
                actions.clear();
                val = v;
                action = a;
                actions.add(a);
                
            }
            else if(v == val) {
                actions.add(a);
            }
        }
        int index = (int)(actions.size() * Math.random());
//        System.out.println("index: " + index);
//        System.out.println("Index is " + index);
//        System.out.println("Actions length is " + actions.size());
        //System.out.println("actions: " + actions.size());
        if(actions.get(index) == null) {
            System.out.println("RETURNING A NULL");
        }
        return actions.get(index);
        
    }

     public int maxValue(Board state, int depth, int alpha, int beta) {

        
        Board tstate =  new Board(state);
        Iterator<Coordinate> iter = state.emptySquareIterator();
        if(tstate.isTerminal()) {
            if(tstate.playerWon(computer)) {
                return Integer.MAX_VALUE;
            }
            if(tstate.playerWon(computer.other())) {
                return Integer.MIN_VALUE;
            }
            else {
                return 0;
            }
            
        }
        if(depth == 0) {
            return tstate.evaluate(computer);
        }
        
        int maxValue = Integer.MIN_VALUE;
        while(iter.hasNext()) {
            Coordinate action = iter.next();
//            Action a = (Action)action;
            tstate.set(action, computer);
            maxValue = Math.max(maxValue, minValue(tstate, depth-1, alpha, beta));
            if(maxValue >= beta) {
                return maxValue;
            }
            alpha = Math.max(alpha, maxValue);
            tstate =  new Board(state);
        }
        return maxValue;
    }

     public int minValue(Board state, int depth, int alpha, int beta) {
        Board tstate =  new Board(state);
        Iterator<Coordinate> iter = state.emptySquareIterator();
        if(tstate.isTerminal()) {
            if(tstate.playerWon(computer.other())) {
                return Integer.MIN_VALUE;
            }
         }
        if(depth == 0) {
            return tstate.evaluate(computer);
        }
        
        int minValue = Integer.MAX_VALUE;
        while(iter.hasNext()) {
            Coordinate action = iter.next();
//            Action a = (Action)action;
            tstate.set(action, computer.other());
            minValue = Math.min(minValue, maxValue(tstate, depth-1, alpha, beta));
            if(minValue <= alpha) {
                return minValue;
            }
            beta = Math.min(beta, minValue);
            tstate =  new Board(state);
        }
        return minValue;
    }
}


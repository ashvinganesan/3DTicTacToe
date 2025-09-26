/* Engine worker: loads TeaVM bundle and responds with best moves */
importScripts('app.js');

function getBestMoveFn() {
  if (typeof self.ttt_bestMove === 'function') return self.ttt_bestMove;
  if (typeof self.$rt_exports !== 'undefined' && typeof self.$rt_exports.ttt_bestMove === 'function') return self.$rt_exports.ttt_bestMove;
  if (typeof self.WebEntry !== 'undefined' && typeof self.WebEntry.ttt_bestMove === 'function') return self.WebEntry.ttt_bestMove;
  if (typeof self.tttweb_WebEntry !== 'undefined' && typeof self.tttweb_WebEntry.ttt_bestMove === 'function') return self.tttweb_WebEntry.ttt_bestMove;
  return null;
}

self.onmessage = function(e) {
  const msg = e.data || {};
  if (msg.type === 'bestMove') {
    const fn = getBestMoveFn();
    if (!fn) {
      self.postMessage({ type: 'bestMoveResult', ok: false, error: 'engine-missing' });
      return;
    }
    try {
      const board = msg.board;
      const player = msg.player || 'O';
      let res = fn(board, player.charCodeAt ? player.charCodeAt(0) : player);
      if (!res || typeof res[0] !== 'number') {
        res = fn(board, player);
      }
      if (res && typeof res[0] === 'number') {
        self.postMessage({ type: 'bestMoveResult', ok: true, move: { x: res[0], y: res[1], z: res[2] } });
      } else {
        self.postMessage({ type: 'bestMoveResult', ok: false, error: 'invalid-result', raw: res });
      }
    } catch (err) {
      self.postMessage({ type: 'bestMoveResult', ok: false, error: String(err && err.message || err) });
    }
  }
};



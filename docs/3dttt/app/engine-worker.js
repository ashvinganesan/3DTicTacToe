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
      // Normalize to char code and string both
      const playerCode = (typeof msg.player === 'number') ? msg.player : (typeof msg.player === 'string' && msg.player.length ? msg.player.charCodeAt(0) : 'O'.charCodeAt(0));
      let playerStr = String.fromCharCode(playerCode);
      
      // Try both forms to satisfy TeaVM interop
      let res = fn(board, playerCode); // prefer numeric char code first
      if (!res || typeof res[0] !== 'number') {
        res = fn(board, playerStr);
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



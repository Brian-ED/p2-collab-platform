function transpose(A) {
  return A[0].map((_, j) => A.map((row) => row[j]));
}

function matMul(A, B) {
  const result = Array(A.length)
    .fill()
    .map(() => Array(B[0].length).fill(0));
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      for (let k = 0; k < B.length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
}

function inverse(matrix) {
  const n = matrix.length;
  const identity = matrix.map((_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
  const M = matrix.map((row, i) => [...row, ...identity[i]]);

  for (let i = 0; i < n; i++) {
    let factor = M[i][i];
    if (Math.abs(factor) < 1e-10) return null;

    for (let j = 0; j < 2 * n; j++) M[i][j] /= factor;

    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const coeff = M[k][i];
      for (let j = 0; j < 2 * n; j++) {
        M[k][j] -= coeff * M[i][j];
      }
    }
  }

  return M.map((row) => row.slice(n));
}

function solveLeastSquares(A, b) {
  const At = transpose(A);
  const AtA = matMul(At, A);
  const Atb = matMul(
    At,
    b.map((v) => [v])
  );

  const AtA_inv = inverse(AtA);
  const x = matMul(AtA_inv, Atb);

  return x.map((row) => row[0]);
}

export function solveLinearSystem(A, b) {
  const x = solveLeastSquares(A, b);
  const sumX = x.reduce((acc, val) => acc + val, 0);
  const sumB = b.reduce((acc, val) => acc + val, 0);
  const scale = sumB / sumX;

  const scaledX = x.map((val) => val * scale);

  return scaledX;
}

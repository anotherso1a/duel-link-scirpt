type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type StringKeyof<T> = Exclude<keyof T, symbol>

type CombineStringKey<H extends string | number, L extends string | number> = H extends '' ? `${L}` : `${H}.${L}`

interface Actions {
  [k: string]: (...args: any[]) => any
}

interface DeeperActions {
  [k: string]: DeeperActions | ((...args: any[]) => any)
}

interface Deps {
  [k: string]: {
    actions: DeeperActions
  }
}

type GetActionsKey<A, P extends string | number = ''> = UnionToIntersection<{
  [K in StringKeyof<A>]: {
    [RK in CombineStringKey<P, K>]: A[K] extends DeeperActions ? GetActionsKey<A[K], RK> : Record<RK, A[K]>
  }[CombineStringKey<P, K>]
}[StringKeyof<A>]> // {actA: () => void, storeB.actB: () => void}


type GetAllDepsType<A, D extends Deps, AK extends 'actions'> = {
  [K in StringKeyof<A>]: A[K]
} & UnionToIntersection<{
  [K in StringKeyof<D>]: {
    [P in keyof GetActionsKey<D[K][AK], K>]: GetActionsKey<D[K][AK], K>[P]
  }
}[StringKeyof<D>]>

type GetDispatchAndCommitWithThis<A, D extends Deps, AK extends 'actions'> = (<T extends keyof GetAllDepsType<A, D, AK>>(type: T, ...payload: GetAllDepsType<A, D, AK>[T] extends (...payload: infer P) => any ? P : never) => GetAllDepsType<A, D, AK>[T] extends (...payload: any[]) => infer R ? R : never)

declare function createStoreWithThis<A extends Actions, D extends Deps>(options: {
  actions: A
  deps: D
}): {
  dispatch: GetDispatchAndCommitWithThis<A, D, 'actions'>
}

createStoreWithThis({
  actions: {
    a(p: number){
      return 1
    }
  },
  deps: {
    storeB: {
      actions: {
        b(p: number){
          return 1
        },
        storeC: {
          c(p: number){
            return 1
          }
        }
      },
    }
  }
}).dispatch('storeB.b', 8)
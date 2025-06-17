import { OnModuleInit } from "@nestjs/common";
import Fuse from "fuse.js";

export type FuseMode = 'first' | 'all'

export class FuseService implements OnModuleInit {
    constructor(
        private fuse: Fuse<any>
    ) { }
    onModuleInit() {
        this.fuse = new Fuse([], {
            keys: ['name'],
            threshold: 0.1,
            minMatchCharLength: 3,
        })
        this.fuse.setCollection([])
    }
    setCollection<T>(collection: T[]) {
        this.fuse.setCollection(collection)
    }
    match<T>(input: string, mode: FuseMode = 'all') {
        const result = this.fuse.search<T>(input)
        if (result.length === 0) return null
        if (mode === 'all') return result.map(item => item.item)
        if (mode === 'first') {
            const match = result.find(r => r.item["name"] === input)
            if (match) return match.item
            return result[0].item
        }
    }
    matchAll<T>(inputs: string[], mode: FuseMode) {
        return inputs.map(input => this.match<T>(input, mode))
    }
}
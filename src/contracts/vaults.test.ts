import vaults from './vaults'

for (const [token, vault] of Object.entries(vaults)) {
    test(`logo & address for ${token} are defined`, () => {
        expect(vault.logo).toBeDefined()
        expect(vault.address).toBeDefined()
    });
}
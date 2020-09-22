import vaults from './vaults'

for (const [token, vault] of Object.entries(vaults)) {
    test(`logo for ${token} is defined`, () => {
        expect(vault.logo).toBeDefined()
    });
}
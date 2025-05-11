-- Automatically generated packer.nvim plugin loader code

if vim.api.nvim_call_function('has', {'nvim-0.5'}) ~= 1 then
  vim.api.nvim_command('echohl WarningMsg | echom "Invalid Neovim version for packer.nvim! | echohl None"')
  return
end

vim.api.nvim_command('packadd packer.nvim')

local no_errors, error_msg = pcall(function()

_G._packer = _G._packer or {}
_G._packer.inside_compile = true

local time
local profile_info
local should_profile = false
if should_profile then
  local hrtime = vim.loop.hrtime
  profile_info = {}
  time = function(chunk, start)
    if start then
      profile_info[chunk] = hrtime()
    else
      profile_info[chunk] = (hrtime() - profile_info[chunk]) / 1e6
    end
  end
else
  time = function(chunk, start) end
end

local function save_profiles(threshold)
  local sorted_times = {}
  for chunk_name, time_taken in pairs(profile_info) do
    sorted_times[#sorted_times + 1] = {chunk_name, time_taken}
  end
  table.sort(sorted_times, function(a, b) return a[2] > b[2] end)
  local results = {}
  for i, elem in ipairs(sorted_times) do
    if not threshold or threshold and elem[2] > threshold then
      results[i] = elem[1] .. ' took ' .. elem[2] .. 'ms'
    end
  end
  if threshold then
    table.insert(results, '(Only showing plugins that took longer than ' .. threshold .. ' ms ' .. 'to load)')
  end

  _G._packer.profile_output = results
end

time([[Luarocks path setup]], true)
local package_path_str = "D:\\.cache\\neovim_config\\packer_hererocks\\2.1.1741730670\\share\\lua\\5.1\\?.lua;D:\\.cache\\neovim_config\\packer_hererocks\\2.1.1741730670\\share\\lua\\5.1\\?\\init.lua;D:\\.cache\\neovim_config\\packer_hererocks\\2.1.1741730670\\lib\\luarocks\\rocks-5.1\\?.lua;D:\\.cache\\neovim_config\\packer_hererocks\\2.1.1741730670\\lib\\luarocks\\rocks-5.1\\?\\init.lua"
local install_cpath_pattern = "D:\\.cache\\neovim_config\\packer_hererocks\\2.1.1741730670\\lib\\lua\\5.1\\?.so"
if not string.find(package.path, package_path_str, 1, true) then
  package.path = package.path .. ';' .. package_path_str
end

if not string.find(package.cpath, install_cpath_pattern, 1, true) then
  package.cpath = package.cpath .. ';' .. install_cpath_pattern
end

time([[Luarocks path setup]], false)
time([[try_loadstring definition]], true)
local function try_loadstring(s, component, name)
  local success, result = pcall(loadstring(s), name, _G.packer_plugins[name])
  if not success then
    vim.schedule(function()
      vim.api.nvim_notify('packer.nvim: Error running ' .. component .. ' for ' .. name .. ': ' .. result, vim.log.levels.ERROR, {})
    end)
  end
  return result
end

time([[try_loadstring definition]], false)
time([[Defining packer_plugins]], true)
_G.packer_plugins = {
  LuaSnip = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\LuaSnip",
    url = "https://github.com/L3MON4D3/LuaSnip"
  },
  ["cmp-buffer"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\cmp-buffer",
    url = "https://github.com/hrsh7th/cmp-buffer"
  },
  ["cmp-cmdline"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\cmp-cmdline",
    url = "https://github.com/hrsh7th/cmp-cmdline"
  },
  ["cmp-emoji"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\cmp-emoji",
    url = "https://github.com/hrsh7th/cmp-emoji"
  },
  ["cmp-nvim-lsp"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\cmp-nvim-lsp",
    url = "https://github.com/hrsh7th/cmp-nvim-lsp"
  },
  ["cmp-path"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\cmp-path",
    url = "https://github.com/hrsh7th/cmp-path"
  },
  cmp_luasnip = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\cmp_luasnip",
    url = "https://github.com/saadparwaiz1/cmp_luasnip"
  },
  ["copilot.vim"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\copilot.vim",
    url = "https://github.com/github/copilot.vim"
  },
  ["github-nvim-theme"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\github-nvim-theme",
    url = "https://github.com/projekt0n/github-nvim-theme"
  },
  ["inc-rename.nvim"] = {
    commands = { "IncRename" },
    config = { "\27LJ\2\n’\1\0\0\4\0\b\0\0176\0\0\0006\2\1\0'\3\2\0B\0\3\0037\1\2\0007\0\3\0006\0\3\0\14\0\0\0X\0\1€K\0\1\0006\0\2\0009\0\4\0005\2\6\0005\3\5\0=\3\a\2B\0\2\1K\0\1\0\fkeymaps\1\0\1\fkeymaps\0\1\4\0\0\6i\6n\6x\nsetup\14status_ok\15inc_rename\frequire\npcall\0" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\opt\\inc-rename.nvim",
    url = "https://github.com/smjonas/inc-rename.nvim"
  },
  ["markdown-preview.nvim"] = {
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\opt\\markdown-preview.nvim",
    url = "https://github.com/iamcco/markdown-preview.nvim"
  },
  ["mason-lspconfig.nvim"] = {
    config = { "\27LJ\2\n“\2\0\0\4\0\6\0\t6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\2B\0\2\1K\0\1\0\21ensure_installed\1\0\2\21ensure_installed\0\27automatic_installation\2\1\15\0\0\vlua_ls\fpyright\nts_ls\thtml\ncssls\vjsonls\18rust_analyzer\vyamlls\rdockerls$docker_compose_language_service\nvimls\vbashls\veslint\19markdown_oxide\nsetup\20mason-lspconfig\frequire\0" },
    load_after = {},
    loaded = true,
    needs_bufread = false,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\opt\\mason-lspconfig.nvim",
    url = "https://github.com/williamboman/mason-lspconfig.nvim"
  },
  ["mason.nvim"] = {
    after = { "mason-lspconfig.nvim" },
    config = { "\27LJ\2\n3\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\nsetup\nmason\frequire\0" },
    loaded = true,
    only_config = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\mason.nvim",
    url = "https://github.com/williamboman/mason.nvim"
  },
  ["nvim-cmp"] = {
    config = { "\27LJ\2\n-\0\1\4\1\2\0\5-\1\0\0009\1\0\0019\3\1\0B\1\2\1K\0\1\0\1À\tbody\15lsp_expand˜\4\1\0\v\0\29\00096\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\2\3\0005\4\a\0005\5\5\0003\6\4\0=\6\6\5=\5\b\0049\5\t\0009\5\n\0059\5\v\0055\a\r\0009\b\t\0009\b\f\b)\nüÿB\b\2\2=\b\14\a9\b\t\0009\b\f\b)\n\4\0B\b\2\2=\b\15\a9\b\t\0009\b\16\bB\b\1\2=\b\17\a9\b\t\0009\b\18\bB\b\1\2=\b\19\a9\b\t\0009\b\20\b5\n\21\0B\b\2\2=\b\22\aB\5\2\2=\5\t\0049\5\23\0009\5\24\0054\a\5\0005\b\25\0>\b\1\a5\b\26\0>\b\2\a5\b\27\0>\b\3\a5\b\28\0>\b\4\aB\5\2\2=\5\24\4B\2\2\0012\0\0€K\0\1\0\1\0\1\tname\tpath\1\0\1\tname\vbuffer\1\0\1\tname\fluasnip\1\0\1\tname\rnvim_lsp\fsources\vconfig\t<CR>\1\0\1\vselect\2\fconfirm\n<C-e>\nabort\14<C-Space>\rcomplete\n<C-f>\n<C-b>\1\0\5\14<C-Space>\0\n<C-f>\0\t<CR>\0\n<C-b>\0\n<C-e>\0\16scroll_docs\vinsert\vpreset\fmapping\fsnippet\1\0\3\fsources\0\fsnippet\0\fmapping\0\vexpand\1\0\1\vexpand\0\0\nsetup\fluasnip\bcmp\frequire\0" },
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\nvim-cmp",
    url = "https://github.com/hrsh7th/nvim-cmp"
  },
  ["nvim-lspconfig"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\nvim-lspconfig",
    url = "https://github.com/neovim/nvim-lspconfig"
  },
  ["nvim-notify"] = {
    config = { "\27LJ\2\nw\0\0\4\0\5\0\f6\0\0\0006\1\2\0'\3\1\0B\1\2\2=\1\1\0006\0\2\0'\2\1\0B\0\2\0029\0\3\0005\2\4\0B\0\2\1K\0\1\0\1\0\3\15max_height\3\20\ftimeout\3¸\23\14max_width\3P\nsetup\frequire\vnotify\bvim\0" },
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\nvim-notify",
    url = "https://github.com/rcarriga/nvim-notify"
  },
  ["nvim-treesitter"] = {
    config = { "\27LJ\2\nt\0\0\4\0\6\0\t6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\2B\0\2\1K\0\1\0\14highlight\1\0\1\14highlight\0\1\0\1\venable\2\nsetup\28nvim-treesitter.configs\frequire\0" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\opt\\nvim-treesitter",
    url = "https://github.com/nvim-treesitter/nvim-treesitter"
  },
  ["packer.nvim"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\packer.nvim",
    url = "https://github.com/wbthomason/packer.nvim"
  },
  ["plenary.nvim"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\plenary.nvim",
    url = "https://github.com/nvim-lua/plenary.nvim"
  },
  ["refactoring.nvim"] = {
    commands = { "Refactor" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\opt\\refactoring.nvim",
    url = "https://github.com/ThePrimeagen/refactoring.nvim"
  },
  ["telescope-fzf-native.nvim"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\telescope-fzf-native.nvim",
    url = "https://github.com/nvim-telescope/telescope-fzf-native.nvim"
  },
  ["telescope.nvim"] = {
    loaded = true,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\start\\telescope.nvim",
    url = "https://github.com/nvim-telescope/telescope.nvim"
  },
  ["vim-fugitive"] = {
    commands = { "Git", "G", "Gstatus", "Gblame" },
    loaded = false,
    needs_bufread = true,
    only_cond = false,
    path = "D:\\.local\\share\\neovim_config-data\\site\\pack\\packer\\opt\\vim-fugitive",
    url = "https://github.com/tpope/vim-fugitive"
  }
}

time([[Defining packer_plugins]], false)
-- Config for: nvim-cmp
time([[Config for nvim-cmp]], true)
try_loadstring("\27LJ\2\n-\0\1\4\1\2\0\5-\1\0\0009\1\0\0019\3\1\0B\1\2\1K\0\1\0\1À\tbody\15lsp_expand˜\4\1\0\v\0\29\00096\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\2\3\0005\4\a\0005\5\5\0003\6\4\0=\6\6\5=\5\b\0049\5\t\0009\5\n\0059\5\v\0055\a\r\0009\b\t\0009\b\f\b)\nüÿB\b\2\2=\b\14\a9\b\t\0009\b\f\b)\n\4\0B\b\2\2=\b\15\a9\b\t\0009\b\16\bB\b\1\2=\b\17\a9\b\t\0009\b\18\bB\b\1\2=\b\19\a9\b\t\0009\b\20\b5\n\21\0B\b\2\2=\b\22\aB\5\2\2=\5\t\0049\5\23\0009\5\24\0054\a\5\0005\b\25\0>\b\1\a5\b\26\0>\b\2\a5\b\27\0>\b\3\a5\b\28\0>\b\4\aB\5\2\2=\5\24\4B\2\2\0012\0\0€K\0\1\0\1\0\1\tname\tpath\1\0\1\tname\vbuffer\1\0\1\tname\fluasnip\1\0\1\tname\rnvim_lsp\fsources\vconfig\t<CR>\1\0\1\vselect\2\fconfirm\n<C-e>\nabort\14<C-Space>\rcomplete\n<C-f>\n<C-b>\1\0\5\14<C-Space>\0\n<C-f>\0\t<CR>\0\n<C-b>\0\n<C-e>\0\16scroll_docs\vinsert\vpreset\fmapping\fsnippet\1\0\3\fsources\0\fsnippet\0\fmapping\0\vexpand\1\0\1\vexpand\0\0\nsetup\fluasnip\bcmp\frequire\0", "config", "nvim-cmp")
time([[Config for nvim-cmp]], false)
-- Config for: nvim-notify
time([[Config for nvim-notify]], true)
try_loadstring("\27LJ\2\nw\0\0\4\0\5\0\f6\0\0\0006\1\2\0'\3\1\0B\1\2\2=\1\1\0006\0\2\0'\2\1\0B\0\2\0029\0\3\0005\2\4\0B\0\2\1K\0\1\0\1\0\3\15max_height\3\20\ftimeout\3¸\23\14max_width\3P\nsetup\frequire\vnotify\bvim\0", "config", "nvim-notify")
time([[Config for nvim-notify]], false)
-- Config for: mason.nvim
time([[Config for mason.nvim]], true)
try_loadstring("\27LJ\2\n3\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\nsetup\nmason\frequire\0", "config", "mason.nvim")
time([[Config for mason.nvim]], false)
-- Load plugins in order defined by `after`
time([[Sequenced loading]], true)
vim.cmd [[ packadd mason-lspconfig.nvim ]]

-- Config for: mason-lspconfig.nvim
try_loadstring("\27LJ\2\n“\2\0\0\4\0\6\0\t6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\2B\0\2\1K\0\1\0\21ensure_installed\1\0\2\21ensure_installed\0\27automatic_installation\2\1\15\0\0\vlua_ls\fpyright\nts_ls\thtml\ncssls\vjsonls\18rust_analyzer\vyamlls\rdockerls$docker_compose_language_service\nvimls\vbashls\veslint\19markdown_oxide\nsetup\20mason-lspconfig\frequire\0", "config", "mason-lspconfig.nvim")

time([[Sequenced loading]], false)

-- Command lazy-loads
time([[Defining lazy-load commands]], true)
pcall(vim.api.nvim_create_user_command, 'Git', function(cmdargs)
          require('packer.load')({'vim-fugitive'}, { cmd = 'Git', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-fugitive'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('Git ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'G', function(cmdargs)
          require('packer.load')({'vim-fugitive'}, { cmd = 'G', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-fugitive'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('G ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'Gstatus', function(cmdargs)
          require('packer.load')({'vim-fugitive'}, { cmd = 'Gstatus', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-fugitive'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('Gstatus ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'Gblame', function(cmdargs)
          require('packer.load')({'vim-fugitive'}, { cmd = 'Gblame', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-fugitive'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('Gblame ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'IncRename', function(cmdargs)
          require('packer.load')({'inc-rename.nvim'}, { cmd = 'IncRename', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'inc-rename.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('IncRename ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'Refactor', function(cmdargs)
          require('packer.load')({'refactoring.nvim'}, { cmd = 'Refactor', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'refactoring.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('Refactor ', 'cmdline')
      end})
time([[Defining lazy-load commands]], false)

vim.cmd [[augroup packer_load_aucmds]]
vim.cmd [[au!]]
  -- Filetype lazy-loads
time([[Defining lazy-load filetype autocommands]], true)
vim.cmd [[au FileType markdown ++once lua require("packer.load")({'markdown-preview.nvim'}, { ft = "markdown" }, _G.packer_plugins)]]
time([[Defining lazy-load filetype autocommands]], false)
  -- Event lazy-loads
time([[Defining lazy-load event autocommands]], true)
vim.cmd [[au BufReadPost * ++once lua require("packer.load")({'nvim-treesitter'}, { event = "BufReadPost *" }, _G.packer_plugins)]]
vim.cmd [[au BufNewFile * ++once lua require("packer.load")({'nvim-treesitter'}, { event = "BufNewFile *" }, _G.packer_plugins)]]
time([[Defining lazy-load event autocommands]], false)
vim.cmd("augroup END")

_G._packer.inside_compile = false
if _G._packer.needs_bufread == true then
  vim.cmd("doautocmd BufRead")
end
_G._packer.needs_bufread = false

if should_profile then save_profiles() end

end)

if not no_errors then
  error_msg = error_msg:gsub('"', '\\"')
  vim.api.nvim_command('echohl ErrorMsg | echom "Error in packer_compiled: '..error_msg..'" | echom "Please check your config for correctness" | echohl None')
end

// ═══════════════════════════════════════════════════
// KOVE BOT v4.2 — نسخة الإنتاج المستقرة 2026
// التحسينات: Ultra-Fast Counting + Safety Wrappers + Custom Logo
// ═══════════════════════════════════════════════════

const KOVE_BOT = {
  name: 'Kove Bot',
  username: 'kove_bot',
  version: '4.2.0',
  status: '🟢 Powered by Kove ⚡',
  prefix: '/',
  ownerUserId: null,
  isInitialized: false,
  logoPath: 'img/bot-logo.img' // المسار الجديد للشعار
};

const KOVE_BOT_COMMANDS = [
  { name: 'help',       desc: 'قائمة الأوامر المتاحة',       category: 'عام',      usage: '/help' },
  { name: 'ping',       desc: 'تحقق إن البوت شغال',          category: 'عام',      usage: '/ping' },
  { name: 'info',       desc: 'معلومات عن السيرفر',          category: 'عام',      usage: '/info' },
  { name: 'serverinfo', desc: 'معلومات السيرفر',             category: 'عام',      usage: '/serverinfo' },
  { name: 'members',    desc: 'عدد الأعضاء',                 category: 'عام',      usage: '/members' },
  { name: 'botinfo',    desc: 'معلومات البوت',               category: 'عام',      usage: '/botinfo' },
  { name: 'avatar',     desc: 'صورة البروفايل',              category: 'عام',      usage: '/avatar @user' },
  { name: 'userinfo',   desc: 'معلومات شخص',                 category: 'عام',      usage: '/userinfo @user' },
  { name: 'roles',      desc: 'عرض كل الرتب',                category: 'عام',      usage: '/roles' },
  { name: 'roleinfo',   desc: 'تفاصيل رتبة',                 category: 'عام',      usage: '/roleinfo [role]' },
  { name: 'poll',       desc: 'إنشاء تصويت',                 category: 'تفاعل',    usage: '/poll [السؤال]' },
  { name: 'say',        desc: 'البوت يقول نص',               category: 'تفاعل',    usage: '/say [النص]' },
  { name: 'top',        desc: 'أكثر الأعضاء نشاطاً',        category: 'تفاعل',    usage: '/top' },
  { name: 'rank',       desc: 'ترتيب شخص',                   category: 'تفاعل',    usage: '/rank @user' },
  { name: 'activity',   desc: 'نشاط السيرفر',                category: 'تفاعل',    usage: '/activity' },
  { name: 'rate',       desc: 'قيم عضو',                     category: 'تفاعل',    usage: '/rate @user' },
  { name: 'giveaway',   desc: 'مسابقة/جوائز',               category: 'تفاعل',    usage: '/giveaway' },
  { name: 'ban',        desc: 'حظر عضو',                     category: 'مودريشن', usage: '/ban @user [سبب]',      permission: 'ban_members' },
  { name: 'kick',       desc: 'طرد عضو',                     category: 'مودريشن', usage: '/kick @user [سبب]',     permission: 'kick_members' },
  { name: 'mute',       desc: 'كتم عضو',                     category: 'مودريشن', usage: '/mute @user [دقايق]',   permission: 'mute_members' },
  { name: 'warn',       desc: 'تحذير عضو',                   category: 'مودريشن', usage: '/warn @user [سبب]',     permission: 'warn_members' },
  { name: 'unmute',     desc: 'إلغاء الكتم',                 category: 'مودريشن', usage: '/unmute @user',         permission: 'mute_members' },
  { name: 'unwarn',     desc: 'إزالة تحذير',                 category: 'مودريشن', usage: '/unwarn @user',         permission: 'warn_members' },
  { name: 'bans',       desc: 'قائمة المحظورين',             category: 'مودريشن', usage: '/bans',                 permission: 'ban_members' },
  { name: 'warns',      desc: 'تحذيرات عضو',                 category: 'مودريشن', usage: '/warns @user',          permission: 'warn_members' },
  { name: 'clear',      desc: 'مسح رسايل',                   category: 'مودريشن', usage: '/clear [عدد]',          permission: 'manage_messages' },
  { name: 'slowmode',   desc: 'تبطيء الشات',                 category: 'مودريشن', usage: '/slowmode [ثواني]',     permission: 'manage_channels' },
  { name: 'lock',       desc: 'قفل الشات',                   category: 'مودريشن', usage: '/lock',                 permission: 'manage_channels' },
  { name: 'unlock',     desc: 'فتح الشات',                   category: 'مودريشن', usage: '/unlock',               permission: 'manage_channels' },
  { name: 'nickname',   desc: 'تغيير اسم',                   category: 'مودريشن', usage: '/nickname @user [اسم]', permission: 'manage_members' },
  { name: 'timeout',    desc: 'عقوبة مؤقتة',                 category: 'مودريشن', usage: '/timeout @user [دقايق]',permission: 'mute_members' },
  { name: 'welcome',    desc: 'تفعيل/تعطيل الترحيب',        category: 'إعدادات', usage: '/welcome on|off',        permission: 'manage_server' },
  { name: 'setwelcome', desc: 'تخصيص رسالة الترحيب',        category: 'إعدادات', usage: '/setwelcome [رسالة]',    permission: 'manage_server' },
  { name: 'setrules',   desc: 'تحديد قوانين',                category: 'إعدادات', usage: '/setrules [نص]',         permission: 'manage_server' },
  { name: 'setlog',     desc: 'تحديد قناة اللوجات',          category: 'إعدادات', usage: '/setlog [channel]',      permission: 'manage_server' },
  { name: 'ticket',     desc: 'فتح تذكرة',                   category: 'تذاكر',   usage: '/ticket [سبب]' },
  { name: 'close',      desc: 'إغلاق تذكرة',                 category: 'تذاكر',   usage: '/close' },
  { name: 'add',        desc: 'إضافة شخص للتذكرة',           category: 'تذاكر',   usage: '/add @user' },
  { name: 'remove',     desc: 'إزالة شخص من التذكرة',        category: 'تذاكر',   usage: '/remove @user' },
  { name: 'rename',     desc: 'تغيير اسم التذكرة',           category: 'تذاكر',   usage: '/rename [اسم]' },
  { name: 'botstats',   desc: 'إحصائيات البوت',              category: 'أونر',    usage: '/botstats',    ownerOnly: true },
  { name: 'botservers', desc: 'قائمة السيرفرات',             category: 'أونر',    usage: '/botservers',  ownerOnly: true },
  { name: 'broadcast',  desc: 'رسالة DM للجميع',             category: 'أونر',    usage: '/broadcast [الرسالة]', ownerOnly: true },
  { name: 'shutdown',   desc: 'إيقاف البوت',                 category: 'أونر',    usage: '/shutdown',    ownerOnly: true },
];

async function initializeKoveBot(sb) {
  if (KOVE_BOT.isInitialized) return;
  try {
    const { data } = await sb.from('bot_config').select('*').single();
    KOVE_BOT.prefix       = data?.prefix   || '/';
    KOVE_BOT.ownerUserId  = data?.owner_id || null;
  } catch(e) {
    KOVE_BOT.prefix      = '/';
    KOVE_BOT.ownerUserId = null;
  }
  KOVE_BOT.isInitialized = true;
  console.log(`✅ Kove Bot Ready (v${KOVE_BOT.version})`);
}

const isBotCommand  = (text) => text && text.startsWith(KOVE_BOT.prefix);
const parseCommand  = (text) => {
  if (!isBotCommand(text)) return null;
  const parts = text.slice(KOVE_BOT.prefix.length).trim().split(/\s+/);
  return { cmd: parts[0]?.toLowerCase() || '', args: parts.slice(1).join(' ') };
};

const buildCmdHint = (matches) => {
  if (!matches || !matches.length) return '';
  return matches.map(c => 
    `<div class="cmd-hint-item" data-cmd="/${c.name}" onclick="pickBotCmd('/${c.name}')">` +
      `<span class="cmd-name">/${c.name}</span>` +
      `<span class="cmd-desc">${c.desc}</span>` +
    `</div>`
  ).join('');
};

async function hasPerm(sb, serverId, perm) {
  try {
    const { data } = await sb.rpc('has_permission', { p_server_id: serverId, p_permission: perm });
    return data === true;
  } catch(e) { return false; }
}

async function _botReply(sb, content, channelId, serverId, userId) {
  try {
    const { data: bot } = await sb.from('bot_profiles').select('id').eq('username', KOVE_BOT.username).single();
    if (!bot) return;
    await sb.from('messages').insert({
      channel_id: channelId, server_id: serverId,
      user_id: userId, content, type: 'system', bot_id: bot.id
    });
  } catch(e) { console.error('Bot reply error:', e); }
}

// --- تحسينات Owner Commands: الأمان والسرعة القصوى ---
async function _handleOwnerCmd(sb, cmd, args, channelId, serverId, userId) {
  try {
    if (!KOVE_BOT.ownerUserId || userId !== KOVE_BOT.ownerUserId)
      return _botReply(sb, '🚫 هذا الأمر لأونر البوت فقط.', channelId, serverId, userId);

    if (cmd === 'botstats') {
      // استخدام التحسين الجديد: head: true و select فارغ لسرعة العد
      const [r1, r2, r3] = await Promise.all([
        sb.from('bot_members').select('', { count: 'exact', head: true }),
        sb.from('profiles').select('',    { count: 'exact', head: true }),
        sb.from('messages').select('',    { count: 'exact', head: true }),
      ]);
      return _botReply(sb,
        `📊 **إحصائيات Kove Bot v${KOVE_BOT.version}**\n` +
        `🖥️ السيرفرات: ${r1.count||0}\n👥 المستخدمين: ${r2.count||0}\n` +
        `💬 الرسائل: ${r3.count||0}\n${KOVE_BOT.status}`,
        channelId, serverId, userId
      );
    }

    if (cmd === 'botservers') {
      const { data: srvs } = await sb.from('bot_members').select('server_id,servers(name)').limit(20);
      if (!srvs?.length) return _botReply(sb, '📋 البوت مش في أي سيرفر بعد.', channelId, serverId, userId);
      const list = srvs.map((s,i) => `${i+1}. ${s.servers?.name||'؟'}`).join('\n');
      return _botReply(sb, `🖥️ **السيرفرات (${srvs.length})**\n${list}`, channelId, serverId, userId);
    }

    if (cmd === 'broadcast') {
      if (!args) return _botReply(sb, '❌ اكتب الرسالة. مثال: /broadcast أهلاً!', channelId, serverId, userId);
      await _botReply(sb, '📢 جاري الإرسال...', channelId, serverId, userId);
      const { data: users } = await sb.from('profiles').select('id').neq('id', userId).limit(100);
      let sent = 0;
      for (const u of (users||[])) {
        let { data: dmCh } = await sb.from('dm_channels').select('id')
          .or(`and(user1_id.eq.${userId},user2_id.eq.${u.id}),and(user1_id.eq.${u.id},user2_id.eq.${userId})`)
          .single();
        let chId = dmCh?.id;
        if (!chId) {
          const { data: nc } = await sb.from('dm_channels').insert({ user1_id: userId, user2_id: u.id }).select('id').single();
          chId = nc?.id;
        }
        if (chId) {
          await sb.from('dm_messages').insert({ channel_id: chId, user_id: userId, content: `📢 **رسالة من Kove Bot:**\n${args}`, type: 'text' });
          sent++;
        }
      }
      return _botReply(sb, `✅ تم الإرسال لـ ${sent} مستخدم.`, channelId, serverId, userId);
    }

    if (cmd === 'shutdown')
      return _botReply(sb, `🔴 تم إيقاف البوت.\n${KOVE_BOT.status}`, channelId, serverId, userId);

  } catch (globalErr) {
    console.error('Owner Command Critical Error:', globalErr);
    return _botReply(sb, '⚠️ حدث خطأ داخلي أثناء تنفيذ أمر الأونر.', channelId, serverId, userId);
  }
}

async function runBotCommand(sb, text, channelId, serverId, userId) {
  if (!KOVE_BOT.isInitialized) {
    await initializeKoveBot(sb);
  }

  if (!isBotCommand(text)) return false;
  const parsed = parseCommand(text);
  if (!parsed?.cmd) return false;

  const cmdObj = KOVE_BOT_COMMANDS.find(c => c.name === parsed.cmd);
  if (!cmdObj) return false;

  if (cmdObj.ownerOnly) return _handleOwnerCmd(sb, parsed.cmd, parsed.args, channelId, serverId, userId);
  if (cmdObj.permission && !await hasPerm(sb, serverId, cmdObj.permission))
    return _botReply(sb, '🚫 ليس لديك صلاحية هذا الأمر.', channelId, serverId, userId);
    
  try {
    await sb.rpc('handle_bot_command', { p_channel_id: channelId, p_server_id: serverId, p_user_id: userId, p_command: parsed.cmd, p_args: parsed.args });
  } catch(e) {
    console.error('Bot command error:', e);
    await _botReply(sb, '❌ حصل خطأ، حاول تاني.', channelId, serverId, userId);
  }
  return true;
}

function getMatchingCommands(text, userId) {
  if (!text?.startsWith(KOVE_BOT.prefix)) return [];
  const q = text.slice(1).toLowerCase();
  if (!q || q.includes(' ')) return [];
  const isOwner = userId && userId === KOVE_BOT.ownerUserId;
  return KOVE_BOT_COMMANDS.filter(c => {
    if (c.ownerOnly && !isOwner) return false;
    return c.name.startsWith(q);
  }).slice(0, 8);
}

// استخدام مسار الشعار الجديد
function getBotAvatar() {
  return `<img src="${KOVE_BOT.logoPath}" alt="Kove Bot" style="width:20px; height:20px; border-radius:50%; object-fit:cover;">`;
}

window.KOVE_BOT           = KOVE_BOT;
window.KOVE_BOT_COMMANDS  = KOVE_BOT_COMMANDS;
window.isBotCommand       = isBotCommand;
window.parseCommand       = parseCommand;
window.runBotCommand      = runBotCommand;
window.buildCmdHint       = buildCmdHint; 
window.getMatchingCommands= getMatchingCommands;
window.getBotAvatar       = getBotAvatar;

console.log(`🚀 Kove Bot v${KOVE_BOT.version} Deployment Ready!`);

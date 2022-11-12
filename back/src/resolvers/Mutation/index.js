const fetch = require('node-fetch')
const { network, auth } = require('../../os')
const { User } = require('../../auth')

async function login(args, context) {
  return User.login(args.username, args.password)
}

async function changeUsername(args, context) {
  return User.changeUsername(context, args.newUsername)
}

async function changePassword(args, context) {
  return User.changePassword(context, args.newPassword, args.newPasswordConfirm)
}

async function createUser(args, context) {
  User.getUserFromContext(context)
  if (args.password === args.passwordConfirm) {
    return User.create(args.username, args.password)
  } else {
    const errorMessage = 'Password and password confirmation are not the same.'
    throw new Error(errorMessage)
  }
}

async function deleteUser(args, context) {
  const user = User.getUserFromContext(context)
  const deletedUser = User.findById(args.id)
  if (deletedUser) {
    await User.delete(args.id)
    return deletedUser
  } else {
    const errorMessage = `User with id ${args.id} does not exist.`
    throw new Error(errorMessage)
  }
}

// OS Mutations

async function createOSUser(args, context) {
  User.getUserFromContext(context)
  if (args.password === args.passwordConfirm) {
    return auth.createUser(args.username, args.password)
  } else {
    const errorMessage = 'Password and password confirmation are not the same.'
    throw new Error(errorMessage)
  }
}

async function deleteOSUser(args, context) {
  User.getUserFromContext(context)
  return auth.deleteUser(args.username)
}

async function addAuthorizedKey(args, context) {
  return auth.addAuthorizedKey(args.username, args.key)
}

async function deleteAuthorizedKey(args, context) {
  return auth.deleteAuthorizedKey(args.username, args.line)
}

// Container Mutations
const createContainer = async function (args, context) {
  const { lxd, cloudInitComplete } = context
  await User.getUserFromContext(context)
  let operation = await lxd.instances.create({
    name: args.containerName,
    profile: args.profile,
  })
  await lxd.operations.wait(operation.id)
  operation = await lxd.instances.start(args.containerName)
  await lxd.operations.wait(operation.id)
  const container = await lxd.instances.get(args.containerName)
  cloudInitComplete[container.name] = false
  return container
}

const deleteContainer = async function (args, context) {
  const { lxd, cloudInitComplete } = context
  await User.getUserFromContext(context)
  const container = await lxd.instances.get(args.containerName)
  let operation = await lxd.instances.stop(args.containerName)
  await lxd.operations.wait(operation.id)
  operation = await lxd.instances.delete(args.containerName)
  await lxd.operations.wait(operation.id)
  cloudInitComplete[container.name] = undefined
  return container
}

const startContainer = async function (args, context) {
  const { lxd } = context
  await User.getUserFromContext(context)
  operation = await lxd.instances.start(args.containerName)
  await lxd.operations.wait(operation.id)
  return lxd.instances.get(args.containerName)
}

const stopContainer = async function (args, context) {
  const { lxd } = context
  await User.getUserFromContext(context)
  operation = await lxd.instances.stop(args.containerName)
  await lxd.operations.wait(operation.id)
  return lxd.instances.get(args.containerName)
}

const restartContainer = async function (args, context) {
  const { lxd } = context
  await User.getUserFromContext(context)
  operation = await lxd.instances.restart(args.containerName)
  await lxd.operations.wait(operation.id)
  return lxd.instances.get(args.containerName)
}

const setDescription = async function (args, context) {
  const { lxd } = context
  await User.getUserFromContext(context)
  await lxd.patch(
    `/1.0/instances/${args.containerName}`,
    JSON.stringify({
      description: args.description,
    })
  )
  return lxd.instances.get(args.containerName)
}

// const getCloudInitOutputLog = async function (args, context) {
//   const { lxd } = attachConnectorsToContext
//   await User.getUserFromContext(context)
//   return lxd.instances.getCloudInitOutputLog(args.containerName)
// }

const setInterfaceConfig = async function (args, context) {
  await User.getUserFromContext(context)
  const config = {
    name: args.name,
    dhcp4: args.dhcp,
    addresses: args.addresses,
    gateway4: args.gateway,
  }
  network.setInterfaceConfig(config)
  await new Promise((resolve) => setTimeout(() => resolve(), 2000))
  const ifaces = await network.getInterfaces()
  const defaultRoutes = await network.getDefaultRoutes()
  const iface = ifaces.find((iface) => iface.name === args.name)
  const defaultRoute = defaultRoutes.find(
    (route) => route.interface === iface.name
  )
  return {
    ...iface,
    gateway: defaultRoute ? defaultRoute.gateway : null,
  }
}

module.exports = {
  login,
  changeUsername,
  changePassword,
  createUser,
  deleteUser,
  createOSUser,
  deleteOSUser,
  addAuthorizedKey,
  deleteAuthorizedKey,
  createContainer,
  deleteContainer,
  startContainer,
  stopContainer,
  restartContainer,
  setDescription,
  // getCloudInitOutputLog,
  setInterfaceConfig,
}

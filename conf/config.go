package conf

type config struct {
	AppName,
	RunMode,
	HttpPort,
	DatabaseName string
}

var Conf map[string]*config

func init() {
	Conf = make(map[string]*config)

	Conf["prod"] = &config{
		AppName: "songbox/prod",
		HttpPort: "8080",
		DatabaseName: "prod",
	}

	Conf["test"] = &config{
		AppName: "songbox/test",
		HttpPort: "3001",
		DatabaseName: "songbox_test.db",
	}

	Conf["dev"] = &config{
		AppName: "songbox/dev",
		HttpPort: "3000",
		DatabaseName: "dev",
	}
}

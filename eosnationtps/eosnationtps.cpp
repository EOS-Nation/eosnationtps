#include <eosiolib/eosio.hpp>
using namespace eosio;

class eosnationtps : public eosio::contract {
  public:
      using contract::contract;
      void ath(std::string msg) {}
};

EOSIO_ABI( eosnationtps, (ath) )